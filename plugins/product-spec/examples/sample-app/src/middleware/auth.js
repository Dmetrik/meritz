// 사내 SSO 헤더를 신뢰한다 (게이트웨이가 검증 후 주입)
export function requireStaff(req, res, next) {
  if (req.user?.role !== "staff") {
    return res.status(403).json({ error: "staff_only" });
  }
  next();
}
