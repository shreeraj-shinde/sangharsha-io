"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import { toast } from "sonner";
import { mockUser } from "@/lib/mockData";
import {
  Save,
  Trash2,
  Bell,
  Shield,
  Link as LinkIcon,
  User,
  Lock,
  Download,
  Eye,
  Loader2,
} from "lucide-react";

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    jobAlerts: true,
    weeklyDigest: false,
  });
  const [connectedPlatforms, setConnectedPlatforms] = useState({
    googleDrive: false,
    linkedin: mockUser.connectedPlatforms.linkedin,
    naukri: mockUser.connectedPlatforms.naukri,
  });

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      toast.success("Settings saved successfully");
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      toast.error("Account deletion is not available in the demo");
    }
  };

  return (
    <div className="min-h-screen bg-muted/10 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 left-[-100px] w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-40 right-[-100px] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-float-delayed" />

      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10 animate-slide-up">
            <h1 className="text-4xl font-bold mb-3 tracking-tight">Settings</h1>
            <p className="text-muted-foreground text-lg">
              Manage your account preferences and integrations
            </p>
          </div>

          {/* Profile Information */}
          <Card className="mb-8 border shadow-sm hover:shadow-md transition-all animate-slide-up-delay-1 overflow-hidden">
            <div className="h-1 w-full gradient-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-11 bg-muted/30 focus:bg-background transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="h-11 bg-muted/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed for security reasons
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="gradient-primary text-white min-w-[140px] shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Connected Platforms */}
          <Card className="mb-8 border shadow-sm hover:shadow-md transition-all animate-slide-up-delay-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-blue-500" />
                Connected Platforms
              </CardTitle>
              <CardDescription>
                Connect your job search accounts for better recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Drive */}
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform">
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 87.3 78"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                        fill="#0066da"
                      />
                      <path
                        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                        fill="#00ac47"
                      />
                      <path
                        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                        fill="#ea4335"
                      />
                      <path
                        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
                        fill="#00832d"
                      />
                      <path
                        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                        fill="#2684fc"
                      />
                      <path
                        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                        fill="#ffba00"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-base">Google Drive</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {connectedPlatforms.googleDrive ? (
                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                          Connected
                        </span>
                      ) : (
                        "Not connected"
                      )}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={connectedPlatforms.googleDrive}
                  onCheckedChange={(checked) => {
                    setConnectedPlatforms({
                      ...connectedPlatforms,
                      googleDrive: checked,
                    });
                    toast.success(
                      checked
                        ? "Google Drive connected"
                        : "Google Drive disconnected"
                    );
                  }}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>

              <Separator />

              {/* LinkedIn */}
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                      in
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-base">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">
                      {connectedPlatforms.linkedin ? (
                        <span className="text-green-600 dark:text-green-400">
                          Connected
                        </span>
                      ) : (
                        "Not connected"
                      )}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={connectedPlatforms.linkedin}
                  onCheckedChange={(checked) => {
                    setConnectedPlatforms({
                      ...connectedPlatforms,
                      linkedin: checked,
                    });
                    toast.success(
                      checked ? "LinkedIn connected" : "LinkedIn disconnected"
                    );
                  }}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <Separator />

              {/* Naukri */}
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-gray-600 dark:text-gray-300 font-bold text-xl">
                      N
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-base">Naukri.com</p>
                    <p className="text-sm text-muted-foreground">
                      {connectedPlatforms.naukri ? (
                        <span className="text-green-600 dark:text-green-400">
                          Connected
                        </span>
                      ) : (
                        "Not connected"
                      )}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={connectedPlatforms.naukri}
                  onCheckedChange={(checked) => {
                    setConnectedPlatforms({
                      ...connectedPlatforms,
                      naukri: checked,
                    });
                    toast.success(
                      checked ? "Naukri connected" : "Naukri disconnected"
                    );
                  }}
                  className="data-[state=checked]:bg-gray-600"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="mb-8 border shadow-sm hover:shadow-md transition-all animate-slide-up-delay-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between hover:bg-muted/30 p-2 rounded-lg transition-colors -mx-2 px-2">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your applications
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      emailNotifications: checked,
                    })
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between hover:bg-muted/30 p-2 rounded-lg transition-colors -mx-2 px-2">
                <div>
                  <p className="font-medium">Job Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new matching jobs
                  </p>
                </div>
                <Switch
                  checked={notifications.jobAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, jobAlerts: checked })
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between hover:bg-muted/30 p-2 rounded-lg transition-colors -mx-2 px-2">
                <div>
                  <p className="font-medium">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of opportunities
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      weeklyDigest: checked,
                    })
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="mb-8 border shadow-sm hover:shadow-md transition-all animate-slide-up-delay-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Manage your security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-base hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 group"
              >
                <Lock className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-current transition-colors" />
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-base hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 group"
              >
                <Download className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-current transition-colors" />
                Download My Data
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-base hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-foreground group"
              >
                <Eye className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-current transition-colors" />
                Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30 hover:border-destructive shadow-sm hover:shadow-md transition-all animate-slide-up-delay-5 overflow-hidden">
            <CardHeader className="bg-destructive/5 border-b border-destructive/10">
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="w-full hover:bg-red-600 transition-colors h-11"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
