# Setting Up Botpress for Your Astro Events App

This guide will walk you through the process of setting up Botpress for your Astrobot chatbot. The integration has already been implemented, but you'll need to configure your own Botpress bot for full functionality.

## 1. Create a Botpress Account

1. Go to [Botpress.com](https://botpress.com) and sign up for a free account.
2. Verify your email address and complete the registration process.

## 2. Create a New Bot

1. From your Botpress dashboard, click on "Create Bot".
2. Give your bot a name (e.g., "Astrobot") and a description.
3. Choose a template or start from scratch.

## 3. Design Your Bot's Conversation Flow

1. In the Botpress Studio, click on "Workflows" in the left panel.
2. Create a conversation flow for your bot. For an astronomy chatbot, you might want to include:
   - A welcome message
   - Responses to common astronomy questions
   - Information about planets, stars, galaxies, etc.

## 4. Add a Knowledge Base

1. Click on "Knowledge" in the left panel.
2. Upload documents related to astronomy, space exploration, and cosmic events.
3. These documents will be used by the bot to provide accurate information to users.

## 5. Train Your Bot

1. Use the Botpress training features to improve your bot's understanding of astronomy-related queries.
2. Test your bot's responses and refine as needed.

## 6. Deploy Your Bot

1. Click on "Publish" in the Botpress Studio.
2. This will make your bot available for integration.

## 7. Get Your Client ID

1. Go to your Botpress dashboard.
2. Select "Webchat" in the side panel.
3. Click on "Advanced Settings".
4. Copy your client ID.

## 8. Update Your Code

Open the `BotpressChat.tsx` file in your project and replace the existing client ID with your own:

```typescript
// Replace with your actual client ID from Botpress
const clientId = "0f6d1f28-97bf-4f7f-80c0-8abb35d5a0a8"; // Replace this with your own client ID
```

Replace the existing client ID with the one you copied from the Botpress dashboard.

## 9. Customize Your Bot (Optional)

You can customize the appearance of your bot by modifying the theme in `BotpressChat.tsx`:

```typescript
const { theme, style } = buildTheme({
  themeName: "prism", // You can try different themes
  themeColor: "#1a237e", // Change the color to match your app's theme
});
```

## 10. Test Your Integration

1. Start your React app with `npm start`.
2. Click on the Astrobot icon in the bottom-right corner.
3. Test the chatbot by asking astronomy-related questions.
4. If the chatbot doesn't appear or doesn't respond correctly, check the browser console for any errors.

## 11. Handling Server-Side Rendering

The current implementation includes a check for client-side rendering using the `useEffect` hook and `isMounted` state. This prevents errors when the component is rendered on the server side, which is important if you decide to deploy your app using a framework that supports server-side rendering.

## Troubleshooting

- If the chatbot doesn't appear, check that your client ID is correct.
- If the bot doesn't respond correctly, review your conversation flow and knowledge base in the Botpress Studio.
- For styling issues, check the `botpress-chat.css` file.

## Additional Resources

- [Botpress Documentation](https://botpress.com/docs)
- [Botpress Community](https://discord.gg/botpress)