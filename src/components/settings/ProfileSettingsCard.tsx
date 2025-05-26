import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/providers/LanguageProvider";

export function ProfileSettingsCard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: user?.email || ""
  });

  useEffect(() => {
    if (user?.tenant) {
      setFormData({
        firstName: user.tenant.first_name || "",
        lastName: user.tenant.last_name || "",
        phone: user.tenant.phone || "",
        address: user.tenant.address || "",
        email: user.tenant.email || user.email || ""
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user?.tenant?.id) {
      toast.error(t("profile.userNotFound"));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('tenants')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.tenant.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast.error(t("profile.saveError"));
        return;
      }

      toast.success(t("profile.saveSuccess"));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t("profile.genericError"));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>{t("profile.title")}</span>
        </CardTitle>
        <CardDescription>
          {t("profile.manage")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
              alt={user?.name} 
            />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName">{t("profile.firstName")}</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">{t("profile.lastName")}</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{t("profile.email")}</span>
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{t("profile.phone")}</span>
            </Label>
            <Input 
              id="phone" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder={t("profile.enterPhone")} 
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address" className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{t("profile.address")}</span>
            </Label>
            <Input 
              id="address" 
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder={t("profile.enterAddress")} 
              className="mt-1"
            />
          </div>
        </div>

        <Button 
          onClick={handleSaveProfile} 
          disabled={loading}
          className="w-full"
        >
          {loading ? t("profile.saving") : t("profile.save")}
        </Button>
      </CardContent>
    </Card>
  );
}