-- Create your SELECT statement here
SELECT
  a.*,
  COUNT(b.id) AS sale_count,
  RANK() over (order by COUNT(b.id) desc) AS sale_rank
FROM people a
LEFT OUTER JOIN sales b ON a.id = b.people_id
GROUP BY a.id
ORDER BY sale_count DESC, a.id ASC