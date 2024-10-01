interface DiscussionPart {
  user_id: number;
  part_id: number;
  name: string;
  profile_path: string;
  title: string;
  timestamp: string;
  description: string;
  is_reply_of: number | null;
}
export default DiscussionPart;
