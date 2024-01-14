"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ProfilePic() {
  const pathname = usePathname();
  if (pathname.startsWith("/posts/")) return null;
  return (
    <section className="w-full mx-auto">
      <Image
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src="/images/perfil.png"
        width={200}
        height={200}
        alt="Ramiro Lopez Cento"
        priority={true}
      />
    </section>
  );
}
