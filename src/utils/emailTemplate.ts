/**
 * Transactional email templates.
 *
 * Email clients do not support CSS custom properties, flexbox, grid, or
 * external stylesheets, so the Meridian palette is written here as literal
 * values. Keep them in sync with the canonical token file at
 * https://github.com/MishraShardendu22/agent-skills
 * (.agents/skills/meridian-design-system/assets/meridian.tokens.css).
 *
 * Layout is table-based with inline styles only, which is the only structure
 * Outlook's Word rendering engine handles reliably.
 */

const PALETTE = {
	canvas: "#121211",
	surface: "#1d1d1b",
	surfaceRaised: "#232321",
	line: "#2e2e2b",
	text: "#f5f3ee",
	textSecondary: "#b7b3aa",
	textMuted: "#8f8b83",
	accent: "#8b7cff",
	accentSoft: "#a396ff",
} as const;

const FONT_TEXT =
	"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_MONO =
	"'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, 'Courier New', monospace";

/** Escapes the five characters that can break out of HTML text or attributes. */
export function escapeHtml(value: string): string {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

interface EmailTemplateProps {
	to_name: string;
	otp: string;
}

function otpExpiryMinutes(): string {
	return process.env.OTP_EXPIRY_MINUTES || "10";
}

/**
 * Renders the body of the verification email. Returns a fragment; wrap it with
 * `renderEmailDocument` to produce a complete, sendable document.
 */
export const EmailTemplate = ({ to_name, otp }: EmailTemplateProps): string => {
	const name = escapeHtml(to_name);
	const code = escapeHtml(otp);
	const minutes = escapeHtml(otpExpiryMinutes());

	return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PALETTE.canvas};margin:0;padding:0;width:100%;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:${PALETTE.surface};border:1px solid ${PALETTE.line};border-radius:14px;">

        <tr>
          <td style="padding:32px 32px 0 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:28px;height:28px;background-color:rgba(139,124,255,0.12);border:1px solid rgba(139,124,255,0.32);border-radius:6px;color:${PALETTE.accentSoft};font-family:Georgia,serif;font-size:13px;line-height:28px;text-align:center;">EN</td>
                <td style="padding-left:12px;font-family:${FONT_TEXT};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${PALETTE.textMuted};">Engineering Notes</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 0 32px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;letter-spacing:-0.5px;color:${PALETTE.text};">
            Verify your email
          </td>
        </tr>

        <tr>
          <td style="padding:14px 32px 0 32px;font-family:${FONT_TEXT};font-size:15px;line-height:1.6;color:${PALETTE.textSecondary};">
            Hello ${name}, use the code below to finish setting up your account.
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:28px 32px 0 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${PALETTE.surfaceRaised};border:1px solid rgba(139,124,255,0.32);border-radius:10px;">
              <tr>
                <td align="center" style="padding:22px 12px;font-family:${FONT_MONO};font-size:34px;font-weight:600;letter-spacing:8px;color:${PALETTE.accentSoft};word-break:break-all;">
                  ${code}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 0 32px;font-family:${FONT_TEXT};font-size:13px;line-height:1.6;color:${PALETTE.textMuted};">
            This code expires in ${minutes} minutes. If you did not request it, no action is needed.
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 0 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:1px;background-color:${PALETTE.line};line-height:1px;font-size:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 32px 32px;font-family:${FONT_TEXT};font-size:12px;line-height:1.6;color:${PALETTE.textMuted};">
            Sent by Engineering Notes, part of the Shardendu Mishra product ecosystem.<br>
            <a href="https://blogs.mishrashardendu22.is-a.dev" style="color:${PALETTE.accentSoft};text-decoration:none;">blogs.mishrashardendu22.is-a.dev</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>`.trim();
};

/**
 * Wraps a template fragment in a complete email document, including the
 * preheader that inbox previews show and the colour-scheme declarations that
 * stop dark-mode clients from inverting the palette.
 */
export function renderEmailDocument(
	title: string,
	preheader: string,
	body: string,
): string {
	return `<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(title)}</title>
<style>
  :root { color-scheme: dark; supported-color-schemes: dark; }
  body { margin:0; padding:0; width:100% !important; background-color:${PALETTE.canvas}; }
  table { border-collapse:collapse; }
  img { border:0; outline:none; text-decoration:none; }
  a { color:${PALETTE.accentSoft}; }
  @media only screen and (max-width:600px) {
    .m-pad { padding-left:20px !important; padding-right:20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${PALETTE.canvas};">
<div style="display:none;font-size:1px;color:${PALETTE.canvas};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>
${body}
</body>
</html>`;
}

/** Plain-text alternative. Every transactional send must include one. */
export function otpPlainText({ to_name, otp }: EmailTemplateProps): string {
	return [
		`Hello ${to_name},`,
		"",
		"Use this code to finish setting up your Engineering Notes account:",
		"",
		`    ${otp}`,
		"",
		`The code expires in ${otpExpiryMinutes()} minutes.`,
		"If you did not request it, no action is needed.",
		"",
		"Engineering Notes",
		"https://blogs.mishrashardendu22.is-a.dev",
	].join("\n");
}
