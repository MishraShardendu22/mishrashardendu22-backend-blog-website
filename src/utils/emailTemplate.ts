interface EmailTemplateProps {
	to_name: string;
	otp: string;
}

export const EmailTemplate = ({ to_name, otp }: EmailTemplateProps): string => {
	return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090b; padding: 50px 20px; color: #fafafa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; padding: 40px; border-radius: 12px; border: 1px solid #27272a; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);">
        <!-- Title -->
        <h2 style="font-size: 22px; color: #fafafa; font-weight: 700; margin-bottom: 24px; text-align: center; font-family: 'Space Grotesk', system-ui, sans-serif;">
          Verification Code
        </h2>
        
        <!-- Greeting Section -->
        <p style="font-size: 16px; color: #fafafa; line-height: 1.7; margin-bottom: 20px; text-align: center;">
          Hello <span style="color: #8b5cf6; font-weight: 700;">${to_name}</span>,
        </p>
        
        <p style="font-size: 14px; color: #a1a1aa; line-height: 1.8; margin-bottom: 32px; text-align: center;">
          Please use the verification code below to complete your account setup.
        </p>

        <!-- OTP Section -->
        <div style="text-align: center; margin: 36px 0;">
          <div style="background-color: #09090b; border: 2px solid #7c3aed; border-radius: 10px; padding: 24px 40px; display: inline-block;">
            <div style="font-size: 36px; font-weight: 700; color: #8b5cf6; letter-spacing: 6px; font-family: 'Courier New', Courier, monospace;">
              ${otp}
            </div>
          </div>
        </div>

        <!-- Security Reminder -->
        <p style="font-size: 13px; color: #a1a1aa; line-height: 1.6; text-align: center; padding: 14px; background-color: #27272a; border-left: 4px solid #7c3aed; border-radius: 4px; margin: 24px 0;">
          For your security, this verification code will expire in ${process.env.OTP_EXPIRY_MINUTES || "10"} minutes.
        </p>

        <!-- Divider -->
        <div style="width: 60px; height: 2px; background-color: #27272a; margin: 40px auto;"></div>

        <!-- Disregard Note -->
        <p style="font-size: 13px; color: #71717a; line-height: 1.6; text-align: center;">
          If you didn't request this verification, please disregard this email.
        </p>

        <!-- Footer Section -->
        <div style="margin-top: 40px; text-align: center; font-size: 11px;">
          <div style="color: #71717a;">
            © ${new Date().getFullYear()} Shardendu Mishra
            <br>
            <span style="color: #52525b;">All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  `;
};
