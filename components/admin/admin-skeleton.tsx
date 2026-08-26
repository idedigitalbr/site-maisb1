import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const metricSkeletons = [
  { accent: 'bg-[#f1ece4]' },
  { accent: 'bg-[#edf9f0]' },
  { accent: 'bg-[#fff8e6]' },
];

export function AdminPageSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Carregando painel">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {metricSkeletons.map(({ accent }) => (
          <Card key={accent}>
            <CardContent className="flex items-center gap-4 p-5">
              <Skeleton className={`h-11 w-11 rounded-xl ${accent}`} />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-7 w-10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-11 w-full md:max-w-sm" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-14 w-full" />)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PostsDashboardSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Carregando publicações">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {metricSkeletons.map(({ accent }) => (
          <Card key={accent}>
            <CardContent className="flex items-center gap-4 p-5">
              <Skeleton className={`h-11 w-11 rounded-xl ${accent}`} />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-7 w-10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col justify-between gap-4 border-b border-[#e7e0d6] p-5 md:flex-row md:items-center">
            <div className="space-y-2">
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-11 w-full md:max-w-sm" />
          </div>
          <div className="hidden h-12 items-center gap-5 px-5 md:grid md:grid-cols-[48%_18%_13%_13%_8%]">
            {Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-3 w-20" />)}
          </div>
          <div className="divide-y divide-[#eee9e2]">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex min-h-[76px] items-center gap-3 px-5 py-3">
                <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 max-w-[360px]" />
                  <Skeleton className="h-3 w-1/2 max-w-[260px]" />
                </div>
                <Skeleton className="hidden h-4 w-24 md:block" />
                <Skeleton className="hidden h-6 w-20 rounded-full md:block" />
                <Skeleton className="hidden h-4 w-24 md:block" />
                <Skeleton className="hidden h-8 w-12 md:block" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
