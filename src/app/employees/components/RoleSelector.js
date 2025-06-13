// /app/employees/components/RoleSelector.js
const rolePermissions = {
  admin: [
    "admin:read",
    "admin:write",
    "admin:delete",
    "employees:read",
    "employees:write",
    "employees:delete",
    "patients:read",
    "patients:write",
    "visits:read",
    "visits:write",
    "visits:cancel",
    "reports:read",
    "reports:generate",
  ],
  employee: [
    "patients:read",
    "patients:write",
    "visits:read",
    "visits:write",
    "appointments:read",
    "appointments:write",
  ],
  physio: [
    "patients:read",
    "patients:write",
    "visits:read",
    "visits:write",
    "visits:cancel",
    "examinations:read",
    "examinations:write",
    "examinations:review",
    "appointments:read",
    "appointments:write",
  ],
};

export default function RoleSelector({
  selectedRole,
  selectedPermissions,
  onRoleChange,
  onPermissionsChange,
}) {
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    onRoleChange(newRole);
    onPermissionsChange(rolePermissions[newRole] || []);
  };

  const handlePermissionToggle = (permission) => {
    const newPermissions = selectedPermissions.includes(permission)
      ? selectedPermissions.filter((p) => p !== permission)
      : [...selectedPermissions, permission];
    onPermissionsChange(newPermissions);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Rola</label>
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="employee">Pracownik</option>
          <option value="physio">Fizjoterapeuta</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Uprawnienia</label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded p-3">
          {(rolePermissions[selectedRole] || []).map((permission) => (
            <label key={permission} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission)}
                onChange={() => handlePermissionToggle(permission)}
                className="mr-2"
              />
              <span className="text-sm">{permission}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
