import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";
import s from './Modal.module.css';

type Props = {
	isOpen: boolean;
	onClose?: () => void;
	instantClose?: boolean;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, instantClose = false, children }: Props) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	useEffect(() => {
		if (isOpen) {
			setIsOpened(true);
		} else if (instantClose) {
			setIsOpened(false);
		}
	}, [isOpen, instantClose]);

	const onClickModal = (event: MouseEvent) => {
		if ((event.target as HTMLElement).classList.contains(s.modal)) {
			onClose?.();
		}
	}

	const onAnimationEnd = (event: React.AnimationEvent) => {
		if (event.target !== event.currentTarget) return;
		setIsOpened(false);
	}

	if (!isOpened) return null;

	return createPortal(
		<div
			className={clsx(s.modal, isOpen ? s.modal_open : !instantClose ? s.modal_close : undefined)}
			onClick={onClickModal}
			onAnimationEnd={isOpen ? undefined : !instantClose ? onAnimationEnd : undefined}
		>
			{children}
		</div>
		, document.getElementById('modal-root') || document.body
	)
}
