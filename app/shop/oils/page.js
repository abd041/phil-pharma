import { redirect } from "next/navigation";

export const metadata = {
  title: "PED — Phil's Pharma",
};

export default function OilsRedirectPage() {
  redirect("/shop/ped");
}
