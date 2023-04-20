"use client";

import {RxCross1} from 'react-icons/rx'
import { useCallback, useEffect, useState } from "react";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showMoal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className='
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70'
      >
        <div
          className='
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
            '
        >
          {/* Content */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showMoal ? "translate-y-0" : "translate-y-full"}
              ${showMoal ? "opacity-100" : "opacity-0"}
              `}
          >
            <div
              className='
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
                '
            >
              {/* Header */}
              <div
                className='
                  flex
                  justify-center
                  items-center
                  p-6
                  rounded-t
                  relative
                  border-b-[1px]
                  '
              >
                <button
                  onClick={handleClose}
                  className='
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                    '
                >
                  <RxCross1 size={20} />
                </button>
                <div
                  className='
                    text-lg
                    font-semibold'
                >
                  {title}
                </div>
              </div>
              {/* Body */}
              <div className='relative px-6 py-2 flex-auto'>{body}</div>
              {/* Footer */}
              <div className='flex flex-col gap-2 px-6 py-2'>
                <div
                  className='
                    flex
                    items-center
                    gap-4
                    w-full'
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      wFull
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    wFull
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
