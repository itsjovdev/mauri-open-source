
export interface CompanyProfile {
  name: string;
  logoUrl: string | null;
  lines: string[];
}

export const companyProfile: CompanyProfile = {
  name: "MAURI",
  logoUrl: "/images/logo.png",
  lines: ["Calle Ejemplo, 123", "28001 Madrid, España", "NIF: B00000000"],
};
