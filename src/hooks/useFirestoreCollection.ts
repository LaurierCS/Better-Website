/**
 * Custom React Hook: useFirestoreCollection
 * Fetches documents from Firestore with flexible query support
 * Handles loading, error, and retry logic
 *
 * EXAMPLES:
 *
 * 1. Fetch public team members:
 *    const { data: teamMembers } = useFirestoreCollection<TeamMember>(
 *      'team',
 *      where('is_public', '==', true)
 *    );
 *
 * 2. Fetch upcoming events ordered by date (limit 12):
 *    const { data: events } = useFirestoreCollection<Event>(
 *      'events',
 *      where('date', '>=', Timestamp.now()),
 *      where('visible', '==', true),
 *      orderBy('date', 'asc'),
 *      limit(12)
 *    );
 *
 * 3. Fetch all documents in a collection:
 *    const { data: allDocs } = useFirestoreCollection<Document>('collection');
 *
 * 4. Complex query - team members in specific department:
 *    const { data: devTeam } = useFirestoreCollection<TeamMember>(
 *      'team',
 *      where('departments', 'array-contains', 'development'),
 *      where('is_public', '==', true),
 *      orderBy('role', 'asc')
 *    );
 *
 * RETURN VALUE:
 *   - data: Array of documents matching the query
 *   - loading: Boolean indicating fetch status
 *   - error: Error object if fetch failed, null otherwise
 *   - refetch: Function to manually refresh data
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { collection, query, getDocs, QueryConstraint } from 'firebase/firestore';
import { firestore } from '../services/firebase';

interface UseFirestoreCollectionResult<T> {
    data: T[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useFirestoreCollection<T = unknown>(
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
): UseFirestoreCollectionResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Create a stable reference for query constraints to avoid infinite loops
    const queryKey = useMemo(
        () => JSON.stringify(queryConstraints.map(c => c.type)),
        [queryConstraints]
    );

    const fetchData = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            // Build query with constraints
            const q = query(collection(firestore, collectionName), ...queryConstraints);
            const snapshot = await getDocs(q);

            // Map documents to array
            const docs: T[] = [];
            snapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() } as T);
            });

            setData(docs);
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collectionName, queryKey]);

    // Fetch on mount and when collection name changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
