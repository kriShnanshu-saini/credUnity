import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LabelInputGroup = ({ children }) => <div className='flex flex-col gap-2'>{children}</div>;

// TODO: Add zod schema validation and render error messages
const Register = () => {
	return (
		<div className='w-full min-h-dvh grid place-items-center'>
			<Card className="w-1/4">
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>Enter your email below to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<LabelInputGroup>
								<Label htmlFor='name'>Name</Label>
                                <Input autoFocus tabIndex={1} id="name" placeholder="John Doe"/>
                            </LabelInputGroup>
							<LabelInputGroup>
                                <div className='flex w-full items-center justify-between'>
                                    <Label htmlFor='email'>Email address</Label>
                                    <Link tabIndex={4} to='verify'><small>Verify</small></Link>
                                </div>
                                <Input tabIndex={2} id="email" placeholder="john.doe@credunity.io" />
                            </LabelInputGroup>
                            <LabelInputGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input tabIndex={3} id="password" type="password" placeholder="Password" />
                            </LabelInputGroup>
                            <Button tabIndex={5} type="submit" className="w-full ">Create account</Button>
						</div>
                    </form>
                </CardContent>
                <CardFooter>
                    <small className='text-center w-full'>
                        Already have an account? &nbsp;
                        <Link tabIndex={6} to="/auth/login" className='text-black/80 font-medium dark:text-white'>Login</Link>
                    </small>
                </CardFooter>
			</Card>
		</div>
	);
};

export default Register;
