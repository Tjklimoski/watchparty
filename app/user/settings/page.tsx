// abilty to change name, email (if not OAuth, check for associated accounts through prisma), password (if not OAuth), image, location, & radius
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import UserPageHeading from "@/components/user/UserPageHeading";
import Container from "@/components/util/Container";
import { stateAbrv } from "@/lib/stateAbrv";
import React from "react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="Settings" />

        <section className="w-full max-w-4xl mx-auto p-2 xs:p-4 bg-base-100 bg-opacity-60 backdrop-blur-md rounded-lg">
          <form className="[&>*:not(:last-child)]:mb-12">
            <div className="items-center gap-2 grid grid-cols-[12ch,1fr]">
              <label htmlFor="name" className="text-2xl font-semibold">
                Name
              </label>
              <Input id="name" label=" " type="text" name="title" />
            </div>

            <div className="items-center gap-2 grid grid-cols-[12ch,1fr,min-content]">
              <label htmlFor="city" className="text-2xl font-semibold">
                City
              </label>
              <Input id="city" label=" " type="text" name="title" />
              <Select
                className="border-none disabled:bg-neutral disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="State"
                name="state"
                required={true}
                // required is conditional - based on if city contains a value or not.
              >
                {stateAbrv.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>

            <div className="items-center gap-2 grid grid-cols-[12ch,1fr,min-content]">
              <label htmlFor="radius" className="text-2xl font-semibold">
                Radius
              </label>

              <Input
                id="radius"
                label=" "
                type="range"
                name="title"
                min={1}
                max={100}
                step={1}
                required
              />

              <div className="text-right text-xl font-light">
                {/* display current input value */}
                100
              </div>
            </div>

            {/* Only render password section if user is NOT Oauth */}
            <>
              <div className="items-center gap-2 grid grid-cols-[12ch,1fr]">
                <label
                  htmlFor="password"
                  className="text-2xl font-semibold whitespace-break-spaces"
                >
                  Password
                </label>
                <Input id="password" label=" " type="text" name="title" />
              </div>

              <div className="items-center gap-2 grid grid-cols-[12ch,1fr]">
                <label
                  htmlFor="confirmPassword"
                  className="text-2xl font-semibold whitespace-break-spaces"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  label=" "
                  type="text"
                  name="title"
                  required={true}
                  // confirm password required if value in password
                />
              </div>

              <div className="items-center gap-2 grid grid-cols-[12ch,1fr]">
                <label
                  htmlFor="currentPassword"
                  className="text-2xl font-semibold whitespace-break-spaces"
                >
                  Current Password
                </label>
                <Input
                  id="currentPassword"
                  label=" "
                  type="password"
                  name="title"
                  required={true}
                  // current password required if value in password
                />
              </div>
            </>

            <button
              type="submit"
              className="btn btn-accent w-full max-w-md block mx-auto"
            >
              Update Account
            </button>
          </form>

          <button
            type="button"
            className="btn btn-neutral w-full max-w-md block mx-auto mt-4"
          >
            Delete Account
          </button>
        </section>
      </Container>
    </main>
  );
}
