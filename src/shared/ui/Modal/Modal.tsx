import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";
import s from './Modal.module.css';

type Props = {
	isOpen: boolean;
	onClose?: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	useEffect(() => {
		if (isOpen) {
			setIsOpened(true);
		}
	}, [isOpen]);

	const onClickModal = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			onClose?.();
		}
	}

	const onAnimationEnd = (event: React.AnimationEvent) => {
		if (event.target !== event.currentTarget) return;
		setIsOpened(false)
	}

	if (!isOpened) return null;

	return createPortal(
		<div
			className={clsx(s.modal, isOpen ? s.modal_open : s.modal_close)}
			onClick={onClickModal}
			onAnimationEnd={isOpen ? undefined : onAnimationEnd}
		>
			{children}
		</div>
		, document.getElementById('modal-root') || document.body
	)
}
