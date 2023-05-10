import { useState } from "react";
import clsx from "clsx";

import Checkbox from "./Checkbox";

export const Default = () => {
  return <Checkbox />;
};

export const WithChildren = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Checkbox>
        <div className="flex cursor-pointer">
          <p className="w-5 text-lg">あ</p>
          <p className="w-5 text-lg">い</p>
          <p className="w-5 text-lg">う</p>
          <p className="w-5 text-lg">え</p>
          <p className="w-5 text-lg">お</p>
        </div>
      </Checkbox>
      <Checkbox>
        <div className="flex cursor-pointer">
          <p className="w-5 text-lg">か</p>
          <p className="w-5 text-lg">き</p>
          <p className="w-5 text-lg">く</p>
          <p className="w-5 text-lg">け</p>
          <p className="w-5 text-lg">こ</p>
        </div>
      </Checkbox>
      <Checkbox>
        <div className="flex cursor-pointer">
          <p className="w-5 text-lg">さ</p>
          <p className="w-5 text-lg">し</p>
          <p className="w-5 text-lg">す</p>
          <p className="w-5 text-lg">せ</p>
          <p className="w-5 text-lg">そ</p>
        </div>
      </Checkbox>
    </div>
  );
};

export const StateManagement = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <span>
        Checked :{" "}
        <span
          className={clsx("font-bold", {
            "text-red-500": !checked,
            "text-blue-500": checked,
          })}
        >
          {String(checked)}
        </span>{" "}
      </span>
      <Checkbox isSelected={checked} onChange={() => setChecked(!checked)}>
        <div className="flex cursor-pointer">
          <p className="w-5 text-lg">さ</p>
          <p className="w-5 text-lg">し</p>
          <p className="w-5 text-lg">す</p>
          <p className="w-5 text-lg">せ</p>
          <p className="w-5 text-lg">そ</p>
        </div>
      </Checkbox>
    </div>
  );
};

export const Disabled = () => {
  return <Checkbox isDisabled>Disabled</Checkbox>;
};
