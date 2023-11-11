import Container from "@/components/util/Container";
import Link from "next/link";
import React from "react";

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen">
      <Container>
        <div className=" px-6 py-4 bg-base-100 opacity-80 backdrop-blur-md w-full mx-auto max-w-3xl">
          <h2 className="text-center font-bold underline mb-1">
            HOW TO DELETE USER ACCOUNT
          </h2>

          {/* All account types */}
          <div className="mt-4">
            <h3 className="font-bold underline mb-1">ALL accounts</h3>
            <p>
              When you delete your account ALL user data collected will be
              deleted, along with all related data you created while using the
              site. User accounts are automatically deleted 14 days after
              creation. If you wish to manually delete your account:
            </p>
            <ol className="list-decimal [&>*]:mb-5 pl-8">
              <li>Log in to your account.</li>
              <li>
                Open up your profile menu by clicking on the profile icon in the
                upper right corner.
              </li>
              <li>
                Select{" "}
                <Link
                  href="/user/settings"
                  className="text-primary underline hover:text-primary-focus focus:text-primary-focus"
                >
                  SETTINGS
                </Link>
                .
              </li>
              <li>
                Click on the{" "}
                <span className="font-semibold">"DELETE ACCOUNT"</span> button
                at the bottom of the form.
              </li>
              <li>
                In the popup click on{" "}
                <span className="font-semibold">"DELETE"</span> to confirm you
                wish to delete your account.
              </li>
            </ol>
            <p>
              OR you can reach out to the webmaster to request your account to
              be deleted. Please use the same email you provided when you
              created your account. Our contact details are as follows:
              <br />
              <br />
              TJ Klimoski
              <br />
              tjklimoski@gmail.com
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
