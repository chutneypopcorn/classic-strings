import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import {
  ArrowLeft,
  Users,
  CalendarDays,
  Shield,
  UserCheck,
  Clock,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/");
    }
  }, [isLoading, isAdmin, navigate]);

  const { data: bookings, refetch: refetchBookings } = trpc.booking.list.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  const { data: userList, refetch: refetchUsers } = trpc.user.list.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  const updateStatus = trpc.booking.updateStatus.useMutation({
    onSuccess: () => refetchBookings(),
  });

  const updateRole = trpc.user.updateRole.useMutation({
    onSuccess: () => refetchUsers(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0e6de] flex items-center justify-center">
        <div className="text-[#343a3f] font-sans text-sm">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const statusColors: Record<string, string> = {
    new: "bg-[#e3fe3b] text-[#343a3f]",
    pending: "bg-[#c9a57a] text-white",
    confirmed: "bg-green-500 text-white",
    completed: "bg-[#343a3f] text-white",
  };

  const totalBookings = bookings?.length ?? 0;
  const confirmedBookings = bookings?.filter((b) => b.status === "confirmed").length ?? 0;
  const pendingBookings = bookings?.filter((b) => b.status === "pending").length ?? 0;
  const totalUsers = userList?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#f0e6de]">
      {/* Header */}
      <div className="bg-[#343a3f] pt-24 pb-8 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-sans hover:text-[#e3fe3b] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-[#e3fe3b]" />
            <h1 className="font-serif text-3xl lg:text-4xl text-white font-light">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-white/40 text-sm font-sans">
            Welcome back, {user?.name}. Manage bookings and users.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d6c0b3]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#e3fe3b]/20 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-[#343a3f]" />
              </div>
            </div>
            <p className="text-2xl font-serif text-[#343a3f]">{totalBookings}</p>
            <p className="text-xs text-[#343a3f]/50 uppercase tracking-wider font-sans mt-1">
              Total Bookings
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d6c0b3]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-serif text-[#343a3f]">{confirmedBookings}</p>
            <p className="text-xs text-[#343a3f]/50 uppercase tracking-wider font-sans mt-1">
              Confirmed
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d6c0b3]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#c9a57a]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#c9a57a]" />
              </div>
            </div>
            <p className="text-2xl font-serif text-[#343a3f]">{pendingBookings}</p>
            <p className="text-xs text-[#343a3f]/50 uppercase tracking-wider font-sans mt-1">
              Pending
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d6c0b3]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-serif text-[#343a3f]">{totalUsers}</p>
            <p className="text-xs text-[#343a3f]/50 uppercase tracking-wider font-sans mt-1">
              Total Users
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[#d6c0b3]/20 mb-10 overflow-hidden">
          <div className="p-5 border-b border-[#d6c0b3]/20 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#343a3f]">Bookings</h2>
            <span className="text-xs text-[#343a3f]/40 font-sans">
              {totalBookings} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0e6de]/50">
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Client
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Event
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Venue
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#343a3f]/40 font-sans">
                      No bookings yet
                    </td>
                  </tr>
                )}
                {bookings?.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-[#d6c0b3]/10 hover:bg-[#f0e6de]/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-sans font-medium text-[#343a3f]">
                          {booking.clientName}
                        </p>
                        <p className="text-xs text-[#343a3f]/40 font-sans">
                          {booking.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs uppercase tracking-wider font-sans text-[#343a3f]/60 bg-[#f0e6de] px-2 py-1 rounded">
                        {booking.eventType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-sans text-[#343a3f]/60">
                      {booking.eventDate
                        ? new Date(booking.eventDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-sm font-sans text-[#343a3f]/60">
                      {booking.venue || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs uppercase tracking-wider font-sans px-2.5 py-1 rounded-full ${
                          statusColors[booking.status] || "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative inline-block">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateStatus.mutate({
                              id: booking.id,
                              status: e.target.value as "new" | "pending" | "confirmed" | "completed",
                            })
                          }
                          className="appearance-none bg-[#f0e6de] border border-[#d6c0b3]/30 rounded-lg px-3 py-1.5 pr-8 text-xs font-sans text-[#343a3f] cursor-pointer focus:outline-none focus:border-[#c9a57a]"
                        >
                          <option value="new">New</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#343a3f]/40 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[#d6c0b3]/20 overflow-hidden">
          <div className="p-5 border-b border-[#d6c0b3]/20 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#343a3f]">Users</h2>
            <span className="text-xs text-[#343a3f]/40 font-sans">
              {totalUsers} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0e6de]/50">
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Identifier
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Auth Type
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-sans text-[#343a3f]/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-[#343a3f]/40 font-sans">
                      No users yet
                    </td>
                  </tr>
                )}
                {userList?.map((u) => (
                  <tr
                    key={`${u.authType}-${u.id}`}
                    className="border-t border-[#d6c0b3]/10 hover:bg-[#f0e6de]/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d6c0b3]/30 flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-[#343a3f]/50" />
                        </div>
                        <span className="text-sm font-sans font-medium text-[#343a3f]">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-sans text-[#343a3f]/60">
                      {u.identifier}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs uppercase tracking-wider font-sans px-2.5 py-1 rounded-full ${
                          u.authType === "oauth"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {u.authType}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs uppercase tracking-wider font-sans px-2.5 py-1 rounded-full ${
                          u.role === "admin"
                            ? "bg-[#e3fe3b]/30 text-[#343a3f]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative inline-block">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            updateRole.mutate({
                              id: u.id,
                              authType: u.authType,
                              role: e.target.value as "user" | "admin",
                            })
                          }
                          className="appearance-none bg-[#f0e6de] border border-[#d6c0b3]/30 rounded-lg px-3 py-1.5 pr-8 text-xs font-sans text-[#343a3f] cursor-pointer focus:outline-none focus:border-[#c9a57a]"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#343a3f]/40 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
