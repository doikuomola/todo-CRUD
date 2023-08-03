import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function loading() {
  return (
    <div>
      <h1 className="text-4xl">Posts Page</h1>
      <h2 className="text-2xl">Users</h2>

      <div className="max-w-xl">
        <p>
          <Skeleton count={4} />
        </p>
      </div>

      <ul className="space-y-4 mt-10">
        <Skeleton count={5} className="h-20" />
      </ul>
    </div>
  );
}
