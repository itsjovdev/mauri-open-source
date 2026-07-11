import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateQuote,
  useUpdateQuote,
  useGetQuote,
  useListClients,
  useListProjects,
  getListQuotesQueryKey,
  getGetQuoteQueryKey,
} from "@/api";
import {
  computeItem,
  computeTotals,
  emptyItem,
  type LineItem,
} from "./quote-totals";

export interface QuoteFormState {
  clientId: string;
  projectId: string;
  title: string;
  validUntil: string;
  notes: string;
  items: LineItem[];
}

const emptyForm = (): QuoteFormState => ({
  clientId: "",
  projectId: "",
  title: "",
  validUntil: "",
  notes: "",
  items: [emptyItem()],
});


export function useQuoteForm(quoteId?: number) {
  const isEdit = quoteId !== undefined;
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: clientsData } = useListClients({});
  const { data: projectsData } = useListProjects({});
  const clients = clientsData?.data ?? [];
  const projects = projectsData?.data ?? [];

  const { data: existing, isLoading: loadingQuote } = useGetQuote(
    quoteId ?? 0,
    { query: { enabled: isEdit, queryKey: getGetQuoteQueryKey(quoteId ?? 0) } },
  );

  const createQuote = useCreateQuote();
  const updateQuote = useUpdateQuote();

  const [form, setForm] = useState<QuoteFormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!existing) return;
    setForm({
      clientId: existing.clientId != null ? String(existing.clientId) : "",
      projectId: existing.projectId != null ? String(existing.projectId) : "",
      title: existing.title ?? "",
      validUntil: existing.validUntil ?? "",
      notes: existing.notes ?? "",
      items: existing.items?.length ? existing.items : [emptyItem()],
    });
  }, [existing]);

  const setField = <K extends keyof QuoteFormState>(
    key: K,
    value: QuoteFormState[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateItem = (
    index: number,
    field: keyof LineItem,
    value: string | number,
  ) =>
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = computeItem({ ...items[index], [field]: value });
      return { ...prev, items };
    });

  const addItem = () =>
    setForm((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }));

  const removeItem = (index: number) =>
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));

  const totals = useMemo(() => computeTotals(form.items), [form.items]);

  const isSaving = createQuote.isPending || updateQuote.isPending;

  const validate = (): string | null => {
    if (!form.clientId) return "Debes seleccionar un cliente.";
    if (form.items.some((i) => !i.description.trim()))
      return "Todas las líneas deben tener una descripción.";
    return null;
  };

  const save = async () => {
    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      clientId: parseInt(form.clientId, 10),
      ...(form.projectId ? { projectId: parseInt(form.projectId, 10) } : {}),
      title: form.title || undefined,
      validUntil: form.validUntil || undefined,
      notes: form.notes || undefined,
      items: form.items.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        discount: i.discount,
        tax: i.tax,
        total: i.total,
      })),
    };

    try {
      if (isEdit) {
        await updateQuote.mutateAsync({ id: quoteId, data: payload });
        queryClient.invalidateQueries({ queryKey: getGetQuoteQueryKey(quoteId) });
        queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
        setLocation(`/presupuestos/${quoteId}`);
      } else {
        const created = await createQuote.mutateAsync({
          data: { ...payload, status: "draft" },
        });
        queryClient.invalidateQueries({ queryKey: getListQuotesQueryKey() });
        setLocation(`/presupuestos/${created.id}`);
      }
    } catch {
      setError("Error al guardar el presupuesto. Inténtalo de nuevo.");
    }
  };

  const cancel = () =>
    setLocation(isEdit ? `/presupuestos/${quoteId}` : "/presupuestos");

  return {
    isEdit,
    loading: isEdit && loadingQuote,
    notFound: isEdit && !loadingQuote && !existing,
    form,
    setField,
    updateItem,
    addItem,
    removeItem,
    totals,
    clients,
    projects,
    error,
    isSaving,
    save,
    cancel,
    quoteNumber: existing?.quoteNumber,
    createdAt: existing?.createdAt,
  };
}
