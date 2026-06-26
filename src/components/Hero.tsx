import { Button } from './ui/button'
import { Field } from './ui/field'
import { Input } from './ui/input'
import { Highlighter } from '@/components/ui/highlighter'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-start md:items-center md:text-center mb-20 mt-10">
      <h1 className="text-6xl md:text-8xl mb-8 font-bold max-w-[15ch]">
        What are you{' '}
        <Highlighter
          action="highlight"
          color="#87CEFA"
          animationDuration={500}
          iterations={2}
        >
          cooking
        </Highlighter>{' '}
        today?
      </h1>
      <p className="text-md text-muted-foreground mb-10">
        Search by recipe or ingredient and discover something delicious.
      </p>
      <HeroSearchBar />
    </section>
  )
}

function HeroSearchBar() {
  return (
    <Field className="max-w-100" orientation="horizontal">
      <Input className="py-5" type="search" placeholder="Search..." />
      <Button className="py-5">Search</Button>
    </Field>
  )
}
