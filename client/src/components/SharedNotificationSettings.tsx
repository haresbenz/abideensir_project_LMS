import React from "react";

interface SharedNotificationSettingsProps {
  title: string;
  subtitle: string;
}

// Placeholder for form schema data
interface SharedNotificationSettingsForm {
  notificationEmail: string;
}

const SharedNotificationSettings: React.FC<SharedNotificationSettingsProps> = ({
  title,
  subtitle,
}) => {
  // Simulate the `useForm` functionality with placeholders
  const form = {
    register: (fieldName: keyof SharedNotificationSettingsForm) => ({
      name: fieldName,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`${fieldName} changed to:`, event.target.value);
      },
    }),
    handleSubmit: (callback: (data: SharedNotificationSettingsForm) => void) => (
      event: React.FormEvent
    ) => {
      event.preventDefault();
      // Simulate form submission with mock data
      const mockData: SharedNotificationSettingsForm = { notificationEmail: "mock@example.com" };
      callback(mockData);
    },
  };

  const onSubmit = async (data: SharedNotificationSettingsForm) => {
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          type="text"
          {...form.register("notificationEmail")}
          placeholder="Email"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SharedNotificationSettings;