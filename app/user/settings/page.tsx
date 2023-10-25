// abilty to change name, email (if not OAuth, check for associated accounts through prisma), password (if not OAuth), image, location, & radius
import UserPageHeading from "@/components/user/UserPageHeading";
import Container from "@/components/util/Container";
import React from "react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="Settings" />

        <section>
          <form>
            {/* Settings */}
            {/* submit button */}
          </form>
          {/* Delete account button */}
        </section>
      </Container>
    </main>
  );
}
