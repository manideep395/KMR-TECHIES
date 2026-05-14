import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, BookOpen, TrendingUp, Inbox, Search, Plus, Edit, Trash2, Eye, GraduationCap, UserCog, FileUp, IndianRupee, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";
import { DashThemeToggle } from "@/components/site/DashThemeToggle";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin-portal")({
  head: () => ({ meta: [{ title: "Admin Portal — KMR Technologies" }] }),
  component: AdminPortal,
});

function AdminPortal() {
  const { t } = useT();
  const { user, loading: authLoading } = useAuth();
  const [q, setQ] = useState("");
  const [editItem, setEditItem] = useState<any | null>(null);
  const [newItem, setNewItem] = useState<{ type: string; data: any } | null>(null);

  // Real-time data
  const { data: courses, loading: coursesLoading } = useRealtimeData<Tables<'courses'>>('courses');
  const { data: certifications, loading: certsLoading } = useRealtimeData<Tables<'certifications'>>('certifications');
  const { data: trainings, loading: trainingsLoading } = useRealtimeData<Tables<'trainings'>>('trainings');
  const { data: academicPrograms, loading: programsLoading } = useRealtimeData<Tables<'academic_programs'>>('academic_programs');
  const { data: careers, loading: careersLoading } = useRealtimeData<Tables<'careers'>>('careers');
  const { data: profiles, loading: profilesLoading } = useRealtimeData<Tables<'profiles'>>('profiles');

  if (authLoading || coursesLoading || certsLoading || trainingsLoading || programsLoading || careersLoading || profilesLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-magenta" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You must be logged in as an admin to access this portal.</p>
        </div>
      </div>
    );
  }

  const filteredCourses = courses.filter(c => (c.title + c.description).toLowerCase().includes(q.toLowerCase()));
  const filteredCerts = certifications.filter(c => (c.title + c.description).toLowerCase().includes(q.toLowerCase()));
  const filteredTrainings = trainings.filter(t => (t.title + t.description).toLowerCase().includes(q.toLowerCase()));
  const filteredPrograms = academicPrograms.filter(p => (p.title + p.description).toLowerCase().includes(q.toLowerCase()));
  const filteredCareers = careers.filter(c => (c.title + c.description).toLowerCase().includes(q.toLowerCase()));

  const stats = [
    { i: Users, l: "Total Students", v: profiles.length.toString(), c: "from-cyan-500 to-blue-600" },
    { i: BookOpen, l: "Active Courses", v: (courses.length + certifications.length + trainings.length + academicPrograms.length).toString(), c: "from-magenta to-rose-600" },
    { i: TrendingUp, l: "Open Positions", v: careers.length.toString(), c: "from-emerald-500 to-teal-600" },
    { i: Inbox, l: "Total Programs", v: academicPrograms.length.toString(), c: "from-amber-500 to-orange-600" },
  ];

  const handleAddItem = async (type: string, data: any) => {
    try {
      const { error } = await supabase.from(type).insert(data);
      if (error) throw error;
      toast.success("Item added successfully");
      setNewItem(null);
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const handleUpdateItem = async (type: string, id: string, data: any) => {
    try {
      const { error } = await supabase.from(type).update(data).eq('id', id);
      if (error) throw error;
      toast.success("Item updated successfully");
      setEditItem(null);
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  const handleDeleteItem = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase.from(type).delete().eq('id', id);
      if (error) throw error;
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

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
            <div className="text-xs text-white/70">Real-time Admin Portal</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">Manage courses, certifications, trainings, and more in real-time</p>
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

        <Tabs defaultValue="courses" className="bg-card rounded-2xl border border-border p-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="trainings">Trainings</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>

          {/* COURSES */}
          <TabsContent value="courses" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search courses..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => setNewItem({ type: 'courses', data: { title: '', description: '', category: '', duration: '', price: null } })}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Course
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.price ? `₹${course.price}` : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditItem({ type: 'courses', data: course })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem('courses', course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* CERTIFICATIONS */}
          <TabsContent value="certifications" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search certifications..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => setNewItem({ type: 'certifications', data: { title: '', description: '', provider: '', duration: '', price: null } })}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Certification
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCerts.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">{cert.title}</TableCell>
                      <TableCell>{cert.provider}</TableCell>
                      <TableCell>{cert.duration}</TableCell>
                      <TableCell>{cert.price ? `₹${cert.price}` : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditItem({ type: 'certifications', data: cert })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem('certifications', cert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* TRAININGS */}
          <TabsContent value="trainings" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search trainings..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => setNewItem({ type: 'trainings', data: { title: '', description: '', type: '', duration: '', price: null } })}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Training
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell className="font-medium">{training.title}</TableCell>
                      <TableCell>{training.type}</TableCell>
                      <TableCell>{training.duration}</TableCell>
                      <TableCell>{training.price ? `₹${training.price}` : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditItem({ type: 'trainings', data: training })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem('trainings', training.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ACADEMIC PROGRAMS */}
          <TabsContent value="academic" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search programs..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => setNewItem({ type: 'academic_programs', data: { title: '', description: '', level: '', duration: '', price: null } })}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Program
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.title}</TableCell>
                      <TableCell>{program.level}</TableCell>
                      <TableCell>{program.duration}</TableCell>
                      <TableCell>{program.price ? `₹${program.price}` : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditItem({ type: 'academic_programs', data: program })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem('academic_programs', program.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* CAREERS */}
          <TabsContent value="careers" className="space-y-4 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search careers..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
              </div>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => setNewItem({ type: 'careers', data: { title: '', description: '', location: '', type: '', salary_range: '', requirements: [], benefits: [] } })}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Career
              </Button>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCareers.map((career) => (
                    <TableRow key={career.id}>
                      <TableCell className="font-medium">{career.title}</TableCell>
                      <TableCell>{career.location}</TableCell>
                      <TableCell>{career.type}</TableCell>
                      <TableCell>{career.salary_range}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditItem({ type: 'careers', data: career })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem('careers', career.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Dialog */}
        <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editItem?.type}</DialogTitle>
            </DialogHeader>
            {editItem && (
              <div className="space-y-4">
                {Object.keys(editItem.data).map((key) => {
                  if (key === 'id' || key === 'created_at' || key === 'updated_at') return null;
                  return (
                    <div key={key}>
                      <label className="text-sm font-medium">{key}</label>
                      <Input
                        value={editItem.data[key] || ''}
                        onChange={(e) => setEditItem({
                          ...editItem,
                          data: { ...editItem.data, [key]: e.target.value }
                        })}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setEditItem(null)}>Cancel</Button>
              <Button
                onClick={() => editItem && handleUpdateItem(editItem.type, editItem.data.id, editItem.data)}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Dialog */}
        <Dialog open={!!newItem} onOpenChange={() => setNewItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add {newItem?.type}</DialogTitle>
            </DialogHeader>
            {newItem && (
              <div className="space-y-4">
                {Object.keys(newItem.data).map((key) => {
                  if (key === 'id' || key === 'created_at' || key === 'updated_at') return null;
                  return (
                    <div key={key}>
                      <label className="text-sm font-medium">{key}</label>
                      <Input
                        value={newItem.data[key] || ''}
                        onChange={(e) => setNewItem({
                          ...newItem,
                          data: { ...newItem.data, [key]: e.target.value }
                        })}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setNewItem(null)}>Cancel</Button>
              <Button
                onClick={() => newItem && handleAddItem(newItem.type, newItem.data)}
              >
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

