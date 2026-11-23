import { Bot, Calendar, Code2, Cog, FileText, Filter, Megaphone, Network, MessageCircle, PhoneCall, Sheet, Sparkles, Wallet, Workflow, type LucideProps } from "lucide-react";
import type { IconName } from "@/content/site";

const map = { code: Code2, workflow: Workflow, megaphone: Megaphone, linkedin: Network, bot: Bot, phone: PhoneCall, wallet: Wallet, file: FileText, filter: Filter, message: MessageCircle, sheet: Sheet, calendar: Calendar, cog: Cog, sparkles: Sparkles };

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden strokeWidth={2.2} {...props} />;
}
