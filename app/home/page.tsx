"use client"

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "@/components/TabPanel";
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  return matches
}

export default function Home() {
    const [active, setActive] = useState<number>(0)
    const isMobile = useMediaQuery('(min-width: 768px)', {
      defaultValue: true,
      initializeWithValue: '(min-width: 768px)'
    })

    console.log({isMobile})
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActive(newValue);
    };
    return (
      <div className="relative">
        <div>
            <Tabs value={active} onChange={handleChange} className="w-full shadow-md">
                <Tab label="Active" value={0} className="w-full flex-1" />
                <Tab label="History" value={1} className="w-full flex-1" />
            </Tabs>
            <TabPanel value={active} index={0}>active</TabPanel>
            <TabPanel value={active} index={1}>history</TabPanel>
        </div>
      </div>
    );
  }
  