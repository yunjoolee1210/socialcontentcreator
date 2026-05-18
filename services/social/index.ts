export interface SocialPostResult {
  success: boolean;
  externalPostId?: string;
  error?: string;
}

// --- X (Twitter) API v2 ---
export async function postToX(
  content: string,
  imageUrl?: string
): Promise<SocialPostResult> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
    };

    // If image, upload media first
    let mediaId: string | undefined;
    if (imageUrl) {
      // In production, download image and upload via Twitter media endpoint
      console.log("Image upload to X:", imageUrl);
    }

    const body: any = { text: content };
    if (mediaId) {
      body.media = { media_ids: [mediaId] };
    }

    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, externalPostId: data.data?.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Instagram (Meta Graph API) ---
export async function postToInstagram(
  caption: string,
  imageUrl: string
): Promise<SocialPostResult> {
  try {
    const igUserId = process.env.META_IG_USER_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!igUserId || !accessToken) {
      return { success: false, error: "Instagram credentials not configured" };
    }

    // Step 1: Create media container
    const createRes = await fetch(
      `https://graph.facebook.com/v18.0/${igUserId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          access_token: accessToken,
        }),
      }
    );

    const createData = await createRes.json();
    if (!createData.id) {
      return { success: false, error: "Failed to create media container" };
    }

    // Step 2: Publish
    const publishRes = await fetch(
      `https://graph.facebook.com/v18.0/${igUserId}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: createData.id,
          access_token: accessToken,
        }),
      }
    );

    const publishData = await publishRes.json();
    return { success: true, externalPostId: publishData.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function publishToSocial(
  platform: string,
  content: string,
  imageUrl?: string
): Promise<SocialPostResult> {
  switch (platform.toLowerCase()) {
    case "x":
    case "twitter":
      return postToX(content, imageUrl);
    case "instagram":
      if (!imageUrl) {
        return { success: false, error: "Instagram requires an image" };
      }
      return postToInstagram(content, imageUrl);
    default:
      return { success: false, error: `Unsupported platform: ${platform}` };
  }
}
