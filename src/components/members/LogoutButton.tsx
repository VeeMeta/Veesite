export default function LogoutButton() {
  return (
    <form method="post" action="/api/members/logout" className="m-inline-form">
      <button type="submit" className="m-link-btn">Sign out</button>
    </form>
  );
}
