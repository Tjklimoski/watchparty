import UserSettingsForm from "@/components/form/UserSettingsForm";
import UserPageHeading from "@/components/user/UserPageHeading";
import Container from "@/components/util/Container";

export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="Settings" />
        <UserSettingsForm />
      </Container>
    </main>
  );
}
