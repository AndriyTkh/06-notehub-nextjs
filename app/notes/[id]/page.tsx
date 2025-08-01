import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/noteHubAPI';
import NoteDetailsClient from '../../../components/NoteDetails/NoteDetails.client';
import { NotePageProps } from '@/lib/types/note';

export default async function NoteDetailsPage({ params }: NotePageProps) {
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
