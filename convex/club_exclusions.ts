import { mutation, internalMutation, internalQuery, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Mutation to create a new club exclusion request and schedule email notification
export const submitClubExclusion = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    excludedClubs: v.string(),
    orderDetails: v.string(),
  },
  handler: async (ctx, args) => {
    const exclusionId = await ctx.db.insert("club_exclusions", {
      customerName: args.customerName,
      customerEmail: args.customerEmail,
      excludedClubs: args.excludedClubs,
      orderDetails: args.orderDetails,
      createdAt: Date.now(),
      status: "pending",
    });

    console.log("New club exclusion request created:", exclusionId);

    // Schedule the email notification action to run immediately after this transaction
    await ctx.scheduler.runAfter(0, internal.club_exclusions.sendExclusionNotificationEmail, {
      exclusionId: exclusionId,
    });

    return exclusionId;
  },
});

// Internal action to send email notification
export const sendExclusionNotificationEmail = internalAction({
  args: {
    exclusionId: v.id("club_exclusions"),
  },
  handler: async (ctx, args) => {
    "use node";

    // Get the club exclusion details
    const exclusionRequest = await ctx.runQuery(internal.club_exclusions.getExclusionDetails, {
      exclusionId: args.exclusionId,
    });

    if (!exclusionRequest) {
      console.error("Club exclusion request not found:", args.exclusionId);
      return;
    }

    try {
      const response = await fetch(process.env.EMAIL_NOTIFICATION_ENDPOINT!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail: process.env.RECIPIENT_EMAIL!,
          subject: `Pedido de Exclusão de Clubes - ${exclusionRequest.customerName}`,
          message: `Novo pedido de exclusão de clubes recebido:

Cliente: ${exclusionRequest.customerName}
Email: ${exclusionRequest.customerEmail}

Clubes a excluir da Mystery Box:
${exclusionRequest.excludedClubs}

Detalhes da encomenda:
${exclusionRequest.orderDetails}

Data do pedido: ${new Date(exclusionRequest.createdAt).toLocaleString('pt-PT')}`,
          chatId: process.env.CHAT_ID!,
          appName: process.env.APP_NAME!,
          secretKey: process.env.SECRET_KEY!,
        }),
      });

      if (response.ok) {
        console.log("Club exclusion email notification sent successfully");
        await ctx.runMutation(internal.club_exclusions.updateExclusionStatus, {
          exclusionId: args.exclusionId,
          status: "sent",
        });
      } else {
        console.error("Failed to send club exclusion email notification:", response.status, response.statusText);
        await ctx.runMutation(internal.club_exclusions.updateExclusionStatus, {
          exclusionId: args.exclusionId,
          status: "failed",
        });
      }
    } catch (error) {
      console.error("Error sending club exclusion email notification:", error);
      await ctx.runMutation(internal.club_exclusions.updateExclusionStatus, {
        exclusionId: args.exclusionId,
        status: "failed",
      });
    }
  },
});

// Internal query to get club exclusion details
export const getExclusionDetails = internalQuery({
  args: {
    exclusionId: v.id("club_exclusions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.exclusionId);
  },
});

// Internal mutation to update club exclusion status
export const updateExclusionStatus = internalMutation({
  args: {
    exclusionId: v.id("club_exclusions"),
    status: v.union(v.literal("pending"), v.literal("sent"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.exclusionId, {
      status: args.status,
    });
  },
});