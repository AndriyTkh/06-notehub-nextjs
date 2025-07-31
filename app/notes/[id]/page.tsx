import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/noteHubAPI';
import NoteDetailsClient from '../../../components/NoteDetails/NoteDetails.client';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const id = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
