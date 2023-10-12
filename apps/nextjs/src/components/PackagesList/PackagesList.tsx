import { Dependencies } from "atoms";
import clsx from "clsx";

const PackagesList: React.FC<{
  list: Dependencies;
  activePackage: string;
  setActivePackage: (p: string) => void;
}> = ({ list, setActivePackage, activePackage }) => {
  const { dependencies, devDependencies } = list;

  return (
    <div className="flex flex-col gap-y-8">
      {dependencies.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">Dependencies</p>
          <ul className="flex list-none flex-col">
            {dependencies.map((i) => {
              const isActive = i === activePackage;
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <just a demo>
                <li
                  className={clsx(
                    isActive && "text-primary-500",
                    "hover:text-primary-300",
                  )}
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <just a demo>
                  role="button"
                  key={i}
                  onClick={() => setActivePackage(i)}
                >
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {devDependencies.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">devDependencies</p>
          <ul className="flex list-none flex-col">
            {devDependencies.map((i) => {
              const isActive = i === activePackage;
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <just a demo>
                <li
                  className={clsx(
                    isActive && "text-primary-500",
                    "hover:text-primary-300",
                  )}
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <just a demo>
                  role="button"
                  key={i}
                  onClick={() => setActivePackage(i)}
                >
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PackagesList;
