"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { User } from "@/types";

export function AdminCustomers({ users }: { users: User[] }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Customers</h1>
      <div className="border rounded-xl overflow-hidden overflow-x-auto">
        <Table className="min-w-[480px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || "-"}</TableCell>
                <TableCell><Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge></TableCell>
                <TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
