"use client";

import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import UserPageHeading from "@/components/user/UserPageHeading";
import Container from "@/components/util/Container";
import useUser from "@/hooks/useUser";
import { stateAbrv } from "@/lib/stateAbrv";
import React, { useEffect, useState } from "react";

interface SettingsInputs {
  name?: string;
  city?: string;
  state?: string;
  radius?: number;
  password?: string;
  currentPassword?: string;
}

export default function SettingsPage() {
  const { user } = useUser();
  const [inputs, setInputs] = useState<SettingsInputs>({});

  // Update inputs with user data once user data is available
  useEffect(() => {
    if (!user) return;
    // break location into array with city and state values seperated
    const location = user.location?.city?.split(",");
    setInputs({
      name: user.name ?? undefined,
      city: location?.length === 2 ? location[0].trim() : undefined,
      state: location?.length === 2 ? location[1].trim() : undefined,
      radius: user.radius,
    });
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const field = e.target.name;
    const value =
      field === "radius" ? parseInt(e.target.value) : e.target.value;
    console.log(value, typeof value);
    setInputs(current => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    // handle submit
  }

  console.log(inputs);

  return (
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="Settings" />

        <section className="w-full max-w-4xl mx-auto p-2 xs:p-4 md:p-6 bg-base-100 bg-opacity-60 backdrop-blur-md rounded-lg">
          <form
            className="[&>*:not(:last-child)]:mb-12"
            onSubmit={handleSubmit}
          >
            <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
              <label htmlFor="name" className="text-2xl font-semibold">
                Name
              </label>
              <Input
                label="name"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>

            <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
              <label htmlFor="city" className="text-2xl font-semibold">
                City
              </label>
              <div className="flex flex-col xs:flex-row gap-2 xs:items-center">
                <Input
                  label="city"
                  type="text"
                  name="city"
                  value={inputs.city}
                  onChange={handleChange}
                />
                <Select
                  className="border-none disabled:bg-neutral disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="state"
                  name="state"
                  value={inputs.state}
                  // required if city has a value
                  required={!!inputs.city}
                  onChange={handleChange}
                >
                  {stateAbrv.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
              <label htmlFor="radius" className="text-2xl font-semibold">
                Radius
              </label>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  label="radius"
                  type="range"
                  name="radius"
                  min={1}
                  max={100}
                  step={1}
                  onChange={handleChange}
                  required
                />

                <span className="text-right text-xl font-light min-w-[3ch]">
                  {inputs.radius}
                </span>
              </div>
            </div>

            {/* Only render password section if user is NOT Oauth */}
            <>
              <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
                <label
                  htmlFor="password"
                  className="text-2xl font-semibold whitespace-break-spaces"
                >
                  New Password
                </label>
                <Input
                  label="password"
                  type="text"
                  name="title"
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>

              <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-none">
                <label
                  htmlFor="current-password"
                  className="text-2xl font-semibold whitespace-break-spaces"
                >
                  Current Password
                </label>
                <Input
                  label="current password"
                  type="password"
                  name="title"
                  value={inputs.currentPassword}
                  onChange={handleChange}
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
