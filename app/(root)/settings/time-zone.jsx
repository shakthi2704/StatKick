import React, { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const TimeZone = () => {
  const [open, setOpen] = useState(false)
  const [selectedTimezone, setSelectedTimezone] = useState(null) // Store selected timezone
  const [timezones, setTimezones] = useState([]) // Store timezones from API

  useEffect(() => {
    async function fetchTimezones() {
      try {
        const response = await fetch("/api/timezones")
        const data = await response.json()
        setTimezones(data) // Store API response in state
      } catch (error) {
        console.error("Error fetching timezones:", error)
      }
    }
    fetchTimezones()
  }, [])
  return (
    <main className=" bg-background rounded-b-md p-3">
      <div className="space-y-0.5">
        <h4 className="text-base font-semibold tracking-tight">
          Select Time Zone
        </h4>
        <p className="text-muted-foreground text-sm">
          Change your time zone here. After saving, your settings will be
          updated.
        </p>
      </div>
      <Separator className="my-6" />
      <ScrollArea className="h-[200px] w-full rounded-md px-y">
        <Card className="rounded-md bg-muted/10">
          {/* <CardHeader>
            <CardTitle>Select Time Zone</CardTitle>
            <CardDescription>
              Change your time zone here. After saving, your settings will be
              updated.
            </CardDescription>
          </CardHeader> */}
          <CardContent className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[600px] justify-between"
                  >
                    {selectedTimezone
                      ? `${selectedTimezone.zone} (${selectedTimezone.abbreviation}) - ${selectedTimezone.offset}`
                      : "Select time zone"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[600px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search time zone..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No time zones found.</CommandEmpty>
                      <CommandGroup>
                        {timezones.map((tz) => (
                          <CommandItem
                            className="text-xs"
                            key={tz._id}
                            value={tz.abbreviation}
                            onSelect={() => {
                              setSelectedTimezone(tz)
                              setOpen(false)
                            }}
                          >
                            {`${tz.zone} (${tz.abbreviation}) - ${tz.offset}`}
                            <Check
                              className={
                                selectedTimezone?.abbreviation ===
                                tz.abbreviation
                                  ? "ml-auto opacity-100"
                                  : "ml-auto opacity-0"
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </Popover>
          </CardContent>
        </Card>
      </ScrollArea>
    </main>
  )
}

export default TimeZone
