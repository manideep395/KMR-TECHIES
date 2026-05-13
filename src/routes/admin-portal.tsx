import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, BookOpen, TrendingUp, Inbox, Search, Plus, Edit, Trash2, Eye, GraduationCap, UserCog, FileUp, IndianRupee, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import { DashThemeToggle } from "@/components/site/DashThemeToggle";

export const Route = createFileRoute("/admin-portal")({
  head: () => ({ meta: [{ title: "Admin Portal — KMR Technologies" }] }),
  component: AdminPortal,
});

import { useSharedStore } from "@/lib/store";

// Initial arrays removed, now handled by the shared store

function AdminPortal() {
  const { t } = useT();
  const { state, setStudents, setCourses, setLeads, setStaff, updateStudent } = useSharedStore();
  const { students, courses, leads, staff } = state;
  const [q, setQ] = useState("");
  const [editStudent, setEditStudent] = useState<any | null>(null);
  const [newCourse, setNewCourse] = useState(false);
  const [cName, setCName] = useState("");
  const [cPrice, setCPrice] = useState("");

  const filtered = students.filter(s => (s.name + s.id + s.program).toLowerCase().includes(q.toLowerCase()));

  const stats = [
    { i: Users, l: t("admin.totalStudents"), v: "5,200", c: "from-cyan-500 to-blue-600" },
    { i: BookOpen, l: t("admin.activeCourses"), v: "42", c: "from-magenta to-rose-600" },
    { i: TrendingUp, l: t("admin.placement"), v: "98%", c: "from-emerald-500 to-teal-600" },
    { i: Inbox, l: t("admin.leads"), v: String(leads.filter(l => l.status === "Open").length + 121), c: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-navy-deep text-white">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <UserCog className="h-6 w-6 text-gold" />
            <span className="font-extrabold">KMR · Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <DashThemeToggle />
            <div className="text-xs text-white/70">{t("admin.mock")}</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("admin.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("admin.sub")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`rounded-2xl bg-gradient-to-br ${s.c} text-white p-5 shadow-md`}>
              <s.i className="h-7 w-7 opacity-90 mb-3" />
              <div className="text-3xl font-extrabold">{s.v}</div>
              <div className="text-xs opacity-90 mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="students" className="bg-card rounded-2xl border border-border p-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="students">{t("admin.students")}</TabsTrigger>
            <TabsTrigger value="courses">{t("admin.courses")}</TabsTrigger>
            <TabsTrigger value="inbox">{t("admin.inbox")}</TabsTrigger>
            <TabsTrigger value="staff">{t("admin.staff")}</TabsTrigger>
          </TabsList>

          {/* STUDENTS */}
          <TabsContent value="students" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder={t("admin.search")} value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><Plus className="h-4 w-4 mr-1" /> {t("admin.add")}</Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>{t("dash.name")}</TableHead>
                    <TableHead>{t("dash.program")}</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>{t("admin.status")}</TableHead>
                    <TableHead className="text-right">{t("admin.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono text-xs">{s.id}</TableCell>
                      <TableCell className="font-semibold">{s.name}</TableCell>
                      <TableCell>{s.program}</TableCell>
                      <TableCell>{s.cgpa}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-secondary text-muted-foreground"}`}>{s.status === "Active" ? t("admin.active") : t("admin.alumni")}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => toast.info(`${s.name}`)}><Eye className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditStudent(s)}><Edit className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => { setStudents(students.filter(x => x.id !== s.id)); toast.success(t("admin.deleted")); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* COURSES */}
          <TabsContent value="courses" className="space-y-4 mt-4">
            <div className="flex justify-end">
              <Button onClick={() => setNewCourse(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white"><Plus className="h-4 w-4 mr-1" /> {t("admin.add")}</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(c => (
                <div key={c.id} className="rounded-xl border border-border p-5 bg-secondary/40">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-foreground">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.id} · {c.modules} {t("admin.modules")}</div>
                    </div>
                    <span className="text-sm font-bold text-cyan-600 flex items-center"><IndianRupee className="h-3 w-3" />{c.price.replace("₹", "")}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => toast.success(t("admin.syllabusUploaded"))}><FileUp className="h-3.5 w-3.5 mr-1" /> {t("admin.syllabus")}</Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.info(t("admin.editCourse"))}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => { setCourses(courses.filter(x => x.id !== c.id)); toast.success(t("admin.removed")); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* INBOX */}
          <TabsContent value="inbox" className="space-y-3 mt-4">
            {leads.map(l => (
              <div key={l.id} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-secondary/40">
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">{l.name} <span className="text-xs text-muted-foreground">· {l.email}</span></div>
                  <div className="text-sm text-muted-foreground truncate">{l.subject}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full ${l.status === "Open" ? "bg-amber-100 text-amber-700" : l.status === "Contacted" ? "bg-cyan-100 text-cyan-700" : "bg-emerald-100 text-emerald-700"}`}>{l.status}</span>
                  <Button size="sm" variant="outline" onClick={() => setLeads(leads.map(x => x.id === l.id ? { ...x, status: "Contacted" } : x))}>{t("admin.contacted")}</Button>
                  <Button size="sm" variant="ghost" onClick={() => setLeads(leads.map(x => x.id === l.id ? { ...x, status: "Closed" } : x))}><X className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* STAFF */}
          <TabsContent value="staff" className="space-y-3 mt-4">
            <div className="flex justify-end">
              <Button onClick={() => { setStaff([...staff, { id: `S-0${staff.length+1}`, name: "New Instructor", role: "Mentor", assignment: "—" }]); toast.success(t("admin.removed")); }} className="bg-cyan-500 hover:bg-cyan-600 text-white"><Plus className="h-4 w-4 mr-1" /> {t("admin.add")}</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {staff.map(p => (
                <div key={p.id} className="rounded-xl border border-border bg-secondary/40 p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white font-bold">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.role} · {p.assignment}</div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => { setStaff(staff.filter(x => x.id !== p.id)); toast.success(t("admin.removed")); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit student dialog */}
      <Dialog open={!!editStudent} onOpenChange={o => !o && setEditStudent(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("admin.edit")} — {editStudent?.name}</DialogTitle></DialogHeader>
          {editStudent && (
            <div className="space-y-3">
              <Input value={editStudent.name} onChange={e => setEditStudent({ ...editStudent, name: e.target.value })} />
              <Input value={editStudent.program} onChange={e => setEditStudent({ ...editStudent, program: e.target.value })} />
              <Input value={editStudent.cgpa} onChange={e => setEditStudent({ ...editStudent, cgpa: e.target.value })} />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => { if (editStudent) { updateStudent(editStudent.id, editStudent); toast.success(t("admin.saved")); setEditStudent(null); } }} className="bg-cyan-500 hover:bg-cyan-600 text-white">{t("admin.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New course dialog */}
      <Dialog open={newCourse} onOpenChange={setNewCourse}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("admin.newCourse")}</DialogTitle></DialogHeader>
          <Input placeholder={t("admin.coursePlaceholder")} value={cName} onChange={e => setCName(e.target.value)} />
          <Input placeholder={t("admin.pricePlaceholder")} value={cPrice} onChange={e => setCPrice(e.target.value)} />
          <DialogFooter>
            <Button onClick={() => { if (cName) { setCourses([...courses, { id: `NEW-${courses.length+1}`, name: cName, modules: 6, price: cPrice || "₹50,000", track: "New Track", thumb: "linear-gradient(135deg,#6B7280,#374151)", lessons: [] }]); setCName(""); setCPrice(""); setNewCourse(false); toast.success(t("admin.courseAdded")); } }} className="bg-cyan-500 hover:bg-cyan-600 text-white">{t("admin.create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
