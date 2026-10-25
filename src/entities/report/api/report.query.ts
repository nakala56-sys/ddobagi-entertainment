import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReportFetch, getReportsFetch } from "@/entities/report/api/report.api";
import type { CreateReportPayload, Report } from "@/entities/report/model/report.type";
import { showSuccessToast } from "@/shared/lib/toast";

const EMPTY_REPORTS: Report[] = [];

export const ReportRoutes = {
    PUBLIC_REPORTS: "public:reports",
} as const;

export const useReportsQuery = (pathname: string, enabled = true) => {
    const MUTATION_KEY = ReportRoutes.PUBLIC_REPORTS;
    const { data, isLoading, isError, error, isFetching, isFetched, refetch } = useQuery({
        queryKey: [MUTATION_KEY, pathname, "useReportsQuery"],
        queryFn: () => getReportsFetch(pathname),
        enabled: enabled && Boolean(pathname),
    });

    const response: Report[] = data?.result ?? EMPTY_REPORTS;
    return { data: response, isLoading, isError, error, isFetching, isFetched, refetch };
};

export const useCreateReportMutation = () => {
    const MUTATION_KEY = ReportRoutes.PUBLIC_REPORTS;
    const queryClient = useQueryClient();
    const { data, mutate, mutateAsync, error, isError, isSuccess, isIdle, isPending, isPaused, reset } = useMutation({
        mutationKey: [MUTATION_KEY, "useCreateReportMutation"],
        mutationFn: (payload: CreateReportPayload) => createReportFetch(payload),
        onSuccess: (_response, payload) => {
            showSuccessToast("리포트를 등록했어요");
            queryClient.invalidateQueries({ queryKey: [MUTATION_KEY, payload.pathname] });
        },
    });

    return { mutate, mutateAsync, isError, isIdle, isSuccess, isPending, isPaused, data, error, reset };
};
