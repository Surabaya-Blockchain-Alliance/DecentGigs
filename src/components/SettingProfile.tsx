import React from "react";

export const SettingProfile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-12">
      <div className="w-full max-w-lg bg-card rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile Settings</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input id="name" type="text" className="w-full px-4 py-2 rounded-md border border-border bg-input/30 text-foreground" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input id="email" type="email" className="w-full px-4 py-2 rounded-md border border-border bg-input/30 text-foreground" placeholder="Your Email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="profilePicture">Profile Picture</label>
            <input id="profilePicture" type="file" className="w-full px-4 py-2 rounded-md border border-border bg-input/30 text-foreground" />
          </div>
          <button type="submit" className="w-full py-2 px-4 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition">Save Changes</button>
        </form>
      </div>
    </div>
  );
};
