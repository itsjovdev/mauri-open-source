import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface DeleteMutationLike {
  mutate: (
    variables: { id: number },
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => void;
}

export function useConfirmDelete(
  mutation: DeleteMutationLike,
  queryKey: QueryKey,
  entityLabel: string
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return (id: number, name?: string) => {
    const confirmed = window.confirm(
      `¿Eliminar ${entityLabel}${name ? ` "${name}"` : ""}? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    mutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey });
          toast({
            variant: "success",
            title: `${entityLabel} eliminado`,
            description: name ? `"${name}" se eliminó correctamente.` : undefined,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "No se pudo eliminar",
            description: `Ocurrió un error al eliminar ${entityLabel.toLowerCase()}. Inténtalo de nuevo.`,
          });
        },
      }
    );
  };
}
