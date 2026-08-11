"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_ORDER } from "@/lib/domain/labels";
import { usePortfolioStore } from "@/lib/store";
import type { ApplicationStatus, JobApplication } from "@/lib/types/state";

export interface ApplicationFormValues {
  company: string;
  position: string;
  source: string;
  applicationDate: string;
  status: ApplicationStatus;
  portfolioItemIds: string[];
  notes: string;
  followUpDate: string;
}

const EMPTY: ApplicationFormValues = {
  company: "",
  position: "",
  source: "",
  applicationDate: new Date().toISOString().slice(0, 10),
  status: "APPLIED",
  portfolioItemIds: [],
  notes: "",
  followUpDate: "",
};

function toFormValues(initial?: JobApplication | null): ApplicationFormValues {
  if (!initial) return EMPTY;
  return {
    company: initial.company,
    position: initial.position,
    source: initial.source,
    applicationDate: initial.applicationDate,
    status: initial.status,
    portfolioItemIds: initial.portfolioItemIds,
    notes: initial.notes,
    followUpDate: initial.followUpDate ?? "",
  };
}

function ApplicationFormBody({
  initial,
  onCancel,
  onSubmit,
}: {
  initial?: JobApplication | null;
  onCancel: () => void;
  onSubmit: (values: ApplicationFormValues) => void;
}) {
  const portfolioItems = usePortfolioStore((s) => s.items);
  const [values, setValues] = useState<ApplicationFormValues>(() => toFormValues(initial));

  function togglePortfolio(id: string) {
    setValues((v) => ({
      ...v,
      portfolioItemIds: v.portfolioItemIds.includes(id)
        ? v.portfolioItemIds.filter((p) => p !== id)
        : [...v.portfolioItemIds, id],
    }));
  }

  const canSave = values.company.trim() && values.position.trim();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{initial ? "Edit Lamaran" : "Tambah Lamaran"}</DialogTitle>
      </DialogHeader>
      <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        <div>
          <Label htmlFor="company">Perusahaan</Label>
          <Input
            id="company"
            className="mt-1.5"
            value={values.company}
            onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="position">Posisi</Label>
          <Input
            id="position"
            className="mt-1.5"
            value={values.position}
            onChange={(e) => setValues((v) => ({ ...v, position: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="source">Sumber Lowongan</Label>
          <Input
            id="source"
            className="mt-1.5"
            placeholder="LinkedIn, referral, job board, dsb."
            value={values.source}
            onChange={(e) => setValues((v) => ({ ...v, source: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="applicationDate">Tanggal Lamar</Label>
            <Input
              id="applicationDate"
              type="date"
              className="mt-1.5"
              value={values.applicationDate}
              onChange={(e) => setValues((v) => ({ ...v, applicationDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="followUpDate">Follow-up</Label>
            <Input
              id="followUpDate"
              type="date"
              className="mt-1.5"
              value={values.followUpDate}
              onChange={(e) => setValues((v) => ({ ...v, followUpDate: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <Label>Status</Label>
          <Select
            value={values.status}
            onValueChange={(v) => setValues((s) => ({ ...s, status: v as ApplicationStatus }))}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APPLICATION_STATUS_ORDER.map((status) => (
                <SelectItem key={status} value={status}>
                  {APPLICATION_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {portfolioItems.length > 0 && (
          <div>
            <Label>Portofolio yang Disertakan</Label>
            <div className="mt-1.5 max-h-32 space-y-1.5 overflow-y-auto rounded-md border border-zinc-200 p-2">
              {portfolioItems.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm text-zinc-700">
                  <Checkbox
                    checked={values.portfolioItemIds.includes(p.id)}
                    onCheckedChange={() => togglePortfolio(p.id)}
                  />
                  {p.title}
                </label>
              ))}
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="notes">Catatan</Label>
          <Textarea
            id="notes"
            className="mt-1.5"
            rows={3}
            value={values.notes}
            onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button disabled={!canSave} onClick={() => onSubmit(values)}>
          Simpan
        </Button>
      </DialogFooter>
    </>
  );
}

export function ApplicationFormDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: JobApplication | null;
  onSubmit: (values: ApplicationFormValues) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {open && (
          <ApplicationFormBody
            key={initial?.id ?? "new"}
            initial={initial}
            onCancel={() => onOpenChange(false)}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
