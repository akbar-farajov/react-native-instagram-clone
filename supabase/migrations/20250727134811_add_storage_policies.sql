  -- This policy allows authenticated users to upload files into the 'posts' bucket.
-- The check ensures that a user can only upload into a folder named with their own user ID.
CREATE POLICY "Allow authenticated users to upload to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'posts' AND (storage.foldername(name))[1] = auth.uid()::text );


-- While we are at it, let's add a policy for viewing files.
-- This policy allows anyone to view (SELECT) any file in the public 'posts' bucket.
CREATE POLICY "Allow public read access to posts"
ON storage.objects FOR SELECT
USING ( bucket_id = 'posts' );