import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminActions, AdminLayout, AdminTable } from "@/components/admin/AdminLayout";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui/Primitives";
import { useStore } from "@/store/StoreContext";
import type { Faq } from "@/data/mockData";

export const Route = createFileRoute("/admin/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs | Rituraj Paithani Admin" },
      { name: "description", content: "Manage the questions and answers shown on the storefront FAQ page." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "FAQs | Rituraj Paithani Admin" },
      { property: "og:description", content: "FAQ content management." },
    ],
  }),
  component: AdminFaqs,
});

const blank: Faq = { id: "", question: "", answer: "" };

function AdminFaqs() {
  const { faqs, setFaqs, notify } = useStore();
  const [editing, setEditing] = useState<Faq | null>(null);

  const save = () => {
    if (!editing || !editing.question.trim()) {
      notify("Question is required");
      return;
    }
    setFaqs((prev) => (editing.id ? prev.map((f) => (f.id === editing.id ? editing : f)) : [...prev, { ...editing, id: "f" + (Date.now() % 100000) }]));
    notify(editing.id ? "FAQ updated" : "FAQ added");
    setEditing(null);
  };

  return (
    <AdminLayout title="FAQs" subtitle="Answers shown on the storefront">
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setEditing({ ...blank })}>Add FAQ</Button>
      </div>
      <AdminTable head={["Question", "Answer", "Actions"]}>
        {faqs.map((f) => (
          <tr key={f.id}>
            <td className="px-4 py-3">{f.question}</td>
            <td className="max-w-96 truncate px-4 py-3 text-muted-foreground">{f.answer}</td>
            <td className="px-4 py-3">
              <AdminActions
                onEdit={() => setEditing(f)}
                onDelete={() => {
                  setFaqs((prev) => prev.filter((x) => x.id !== f.id));
                  notify("FAQ deleted");
                }}
              />
            </td>
          </tr>
        ))}
      </AdminTable>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit FAQ" : "Add FAQ"}>
        {editing ? (
          <div className="space-y-4">
            <Field label="Question"><Input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></Field>
            <Field label="Answer"><Textarea rows={4} value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} /></Field>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}