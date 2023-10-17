// This is the publicly available page that's visible to any user. Will show what this user's myList is, their watchParties, and badges for their achievments (Create their first watchparty, attend their first watchparty, host 5 watchparties, attend 10 watchparties, add 10 movies to their list)

import Container from "@/components/util/Container";
import ProfileIcon from "@/components/util/ProfileIcon";
import React from "react";

export default function UserProfilePage() {
  return (
    <main className="min-h-screen">
      <Container>
        <div>
          <ProfileIcon id="" size={56} />
          <h2>Name</h2>
        </div>
        <div>
          <aside>
            <h2>About Me</h2>
            <ul>
              <li>{/* City name */}</li>
              <li>{/* joined date */}</li>
              <li>{/* Number of hosted WPs  */}</li>
              <li>{/* Number of attended WPs  */}</li>
              <li>{/* joined  */}</li>
            </ul>
            <h2>Achievments</h2>
            {/* Badges that show conditionally based on data */}
          </aside>
          <section>
            {/* media carousel */}
            {/* watchparties they're hosting that are upcoming carousel */}
          </section>
        </div>
      </Container>
    </main>
  );
}
