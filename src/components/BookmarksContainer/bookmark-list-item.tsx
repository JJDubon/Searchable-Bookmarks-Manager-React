import ExpandLess from '@mui/icons-material/ExpandLess';
import { ListItemText, TypographyProps } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { BookmarkButton, BookmarkContainer, BookmarkIcon, BookmarkImg } from './styles';
import { BookmarkType, DropType } from './utils';

interface FolderProps {
  title: string;
  type: BookmarkType;
  indentLevel: number;
  isDragging: boolean;
  dropType: DropType;
  isModifiable: boolean;
  overrides: TypographyProps<'span', {}>;
  onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  icon?: JSX.Element;
  src?: string;
  isOpen?: boolean;
  hideDetails?: boolean;
  disabled?: boolean;
}

const BookmarkListItemComponent = ({
  title,
  type,
  indentLevel,
  isDragging,
  dropType,
  isModifiable,
  overrides,
  icon,
  src,
  isOpen,
  hideDetails = false,
  disabled = false,
  onClick,
  onMouseUp,
}: FolderProps) => {
  const componentProps = useMemo(() => getComponentType(type), [type]);
  return (
    <BookmarkContainer
      type={type}
      isDragging={isDragging}
      isOpen={isOpen}
      isModifiable={isModifiable}
      dropType={dropType}
    >
      <BookmarkButton
        sx={{ pl: getIndent(indentLevel) }}
        onClick={onClick}
        onMouseUp={onMouseUp}
        disabled={disabled}
        {...componentProps}
      >
        <BookmarkIcon>
          {src && <BookmarkImg alt={''} src={src} />}
          {icon}
        </BookmarkIcon>
        <ListItemText primary={title} primaryTypographyProps={overrides} />
        {!hideDetails && (
          <motion.div
            animate={{ rotate: getRotation() }}
            transition={{ type: 'ease' }}
            style={{ rotate: getRotation() }}
          >
            <ExpandLess style={{ opacity: 0.15 }} />
          </motion.div>
        )}
      </BookmarkButton>
    </BookmarkContainer>
  );

  function getRotation(): number {
    return isOpen ? 0 : 180;
  }

  function getComponentType(type: 'bookmark' | 'folder') {
    return {
      component: type === 'bookmark' ? 'a' : 'button',
    };
  }
};

export const BookmarkListItem = React.memo(BookmarkListItemComponent);
