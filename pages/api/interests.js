import interests from '../../content/interests.json';

export default function handler(req, res) {
  // Simple read-only API for interests; returns the JSON array
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(interests || []);
}
