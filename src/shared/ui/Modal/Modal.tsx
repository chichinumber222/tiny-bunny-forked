import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";
import s from './Modal.module.css';

type Props = {
	isOpen: boolean;
	onClose?: () => void;
	onUnmountStart?: () => void;
	onUnmountEnd?: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, onUnmountStart, onUnmountEnd, children }: Props) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	useEffect(() => {
		if (isOpen) {
			setIsOpened(true);
		}
	}, [isOpen]);

	const onClickModal = (event: MouseEvent) => {
		if ((event.target as HTMLElement).classList.contains(s.modal)) {
			onClose?.();
		}
	}

	const onCloseAnimationStart = (event: React.AnimationEvent) => {
		if (event.target !== event.currentTarget) return;
		onUnmountStart?.();
	}

	const onCloseAnimationEnd = (event: React.AnimationEvent) => {
		if (event.target !== event.currentTarget) return;
		setIsOpened(false);
		onUnmountEnd?.();
	}

	if (!isOpened) return null;

	return createPortal(
		<div
			className={clsx(s.modal, isOpen ? s.modal_open : s.modal_close)}
			onClick={onClickModal}
			onAnimationStart={isOpen ? undefined : onCloseAnimationStart}
			onAnimationEnd={isOpen ? undefined : onCloseAnimationEnd}
		>
			{children}
		</div>
		, document.getElementById('modal-root') || document.body
	)
}
