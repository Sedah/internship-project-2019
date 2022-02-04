const rules = {
  guest: ["all:visit"],
  employee: ["all:visit"],
  instructor: ["all:visit", "crud:all", "assign:all"],
  admin: ["all:visit", "crud:all", "assign:all", "user:all"]
};

export default rules;
