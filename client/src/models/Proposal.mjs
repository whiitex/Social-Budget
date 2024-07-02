export default function Proposal(
  id,
  description,
  author,
  isApproved = false,
  score = 0
) {
  this.id = id;
  this.description = description;
  this.author = author;
  this.isApproved = isApproved;
  this.score = score;
}
